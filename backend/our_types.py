class User:
    def __init__(self, user_id, username, password):
        self.user_id = user_id
        self.username = username
        self.password = password

class Member:
    def __init__(self, user_id, username):
        self.user_id = user_id
        self.username = username

class Square:
    def __init__(self, square_id, square_image, square_artist_id):
        self.square_id = square_id
        self.square_image = square_image
        self.square_artist_id = square_artist_id

class Drawing:
    def __init__(self, drawing_id, initial_topic, current_topic, squares):
        self.drawing_id = drawing_id
        self.initial_topic = initial_topic
        self.current_topic = current_topic
        self.squares = squares
        

class Group:
    def __init__(self, group_id, today_drawing, members, daily_start_time, daily_close_time):
        self.group_id = group_id
        self.today_drawing = today_drawing
        self.members = members
        self.daily_start_time = daily_start_time
        self.daily_close_time = daily_close_time



