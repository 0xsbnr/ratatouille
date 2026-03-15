class Database:
    import sqlite3
    import datetime

    def __init__(self, db_path):
        self.con = self.sqlite3.connect(db_path, check_same_thread=False)
        self.con.row_factory = self.dict_factory
        self.cur = self.con.cursor()

    def dict_factory(self, cursor, row):
        # copied from sqlite3 documentation for row factories
        d = {}
        for idx, col in enumerate(cursor.description):
            d[col[0]] = row[idx]
        return d

    def read_data(self, select_fields:list, from_field:str, where_fields:list):
        self.cur.execute(f"SELECT {",".join(select_fields)} FROM {
                         from_field} WHERE {",".join(where_fields)}")
        rows = self.cur.fetchall()
        return rows

    def delete_row(self, table:str, conditions:list):
        print(table, conditions)
        self.cur.execute(f"DELETE FROM {table} WHERE {",".join(conditions)}""")
        self.con.commit()

    #-----------------------------
    
    def sign_up(self, username:str, password:str):
        user_id = self.cur.execute("""INSERT INTO USERS (username, password) VALUES (?, ?) RETURNING (id)""", (username, password,)).fetchone()
        self.con.commit()
        return user_id

    def log_in(self, username:str, password:str):
        user_id = self.cur.execute("""SELECT id FROM USERS WHERE username=? AND password=?""", (username,password,)).fetchone()
        if user_id == {}:
            return {"id":-1}
        else:
            return user_id
    
    def join_group(self, user_id:int, group_id:int):
        self.cur.execute("""INSERT OR REPLACE INTO GROUP_MEMBERS (user_id, group_id) VALUES (?, ?)""", (user_id, group_id))
        self.con.commit()
        return True

    def create_group(self, name:str, daily_start_timeL:str, daily_close_time:str):
        group_id = self.cur.execute("""INSERT INTO GROUPS (name, daily_start_time, daily_close_time) VALUES (?, ?, ?) RETURNING (id)""", (user_id, group_id))
        self.con.commit()
        return group_id

    def get_groups(self, user_id:int):
        group_ids = self.cur.execute("""SELECT id FROM GROUPS WHERE user_id=?""", (user_id,)).fetchall()
        groups = []
        for grp in group_ids:
            groups += self.cur.execute("""SELECT GROUPS.id, GROUPS.name, GROUPS.daily_start_time, GROUPS.daily_close_time, GROUPS""")
            groups[-1]["members"] = self.cur.execute("""SELECT USERS.id, USERS.username. USERS.password 
                                        FROM GROUP_MEMBERS
                                        FULL OUTER JOIN USERS ON GROUP_MEMBERS.group_id = USERS.id 
                                        WHERE GROUP_MEMBERS.group_id=?
                                       """, (grp['id']))
        return groups

    def set_up_drawing(self, group_id:int, topic:str, date:str):
        drawing_id = self.cur.execute("""INSERT OR REPLACE INTO DRAWINGS (group_id, init_topic, current_topic, date, last_updated) VALUES (?, ?, ?, ?, ?) RETURNING (id)""",(group_id, topic, topic, date, date,)).fetchone()
        self.con.commit()
        return drawing_id

    def add_square(self, user_id:int, drawing_id:int, file_path:str, complete:int):
        self.cur.execute("""INSERT OR REPLACE INTO SQUARES (user_id, drawing_id, file_path, complete) VALUES (?, ?, ?, ?)""",(user_id, drawing_id, file_path, complete,))
        self.con.commit()
        return True

    def get_drawing(self, drawing_id:int):
        drawing = self.cur.execute("""SELECT * FROM DRAWINGS WHERE id=?""", (drawing_id,)).fetchone()
        return drawing

    def get_drawing_from_group(self, group_id:int, date:str):
        drawing = self.cur.execute("""SELECT id FROM DRAWINGS WHERE date=?""", (date,)).fetchone()
        if drawing == {}:
            ...
        else:
            return drawing

    def set_square(self, user_id:int, drawing_id:int, file_path:str, complete:int):
        self.cur.execute("""UPDATE SQUARES SET file_path=?, complete=? WHERE user_id=? AND drawing_id=?""", (file_path, complete, user_id, drawing_id))
        self.con.commit()
        return True

    
    def new_user(self, username:str, password:str):
        user_id = self.cur.execute("""INSERT INTO USERS 
                                   (username, password) 
                                   VALUES (?, ?) RETURNING (id)""", (username, password))
        self.con.commit()
        return user_id
    
