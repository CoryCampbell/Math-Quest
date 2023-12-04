from app.models import db, Character, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_characters():
    demoCharacter = Character(user_id=1, level=1, appearance=1, difficulty=1, character_name='Demo Character Boy', max_health=100, current_health=100, experience_points=100, coins=10)
    thor = Character(user_id=2, level=5, appearance=1, difficulty=1, character_name='Thor', max_health=500, current_health=500, experience_points=1000, coins=1000)
    her = Character(user_id=3, level=25, appearance=1, difficulty=1, character_name='Her', max_health=1000, current_health=1000, experience_points=10000, coins=10000)

    db.session.add(demoCharacter)
    db.session.add(thor)
    db.session.add(her)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_characters():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.characters RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM characters"))

    db.session.commit()
