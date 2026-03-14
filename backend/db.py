class Database:
    import sqlite3
    from our_types import User, Member, Square, Drawing, Group
    import datetime

    def __init__(self, db_path):
        self.con = self.sqlite3.connect(db_path, check_same_thread=False)
        self.con.row_factory = self.dict_factory
        self.cur = self.con.cursor()

    def read_data(self, select_fields: list, from_field: str, where_fields: list):
        self.cur.execute(f"SELECT {",".join(select_fields)} FROM {
                         from_field} WHERE {",".join(where_fields)}")
        rows = self.cur.fetchall()
        return rows

    def delete_row(self, table: str, conditions: list):
        print(table, conditions)
        self.cur.execute(f"DELETE FROM {table} WHERE {",".join(conditions)}""")
        self.con.commit()
    
