from app.models import db, Dungeon, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_dungeons():
    demoDungeon1 = Dungeon(character_id=1, dungeon_id=1, dungeon_name='demo_dungeon', score=100)
    demoDungeon2 = Dungeon(character_id=2, dungeon_id=1, dungeon_name='demo_dungeon', score=1000)
    demoDungeon3 = Dungeon(character_id=3, dungeon_id=1, dungeon_name='demo_dungeon', score=10000)

    db.session.add(demoDungeon1)
    db.session.add(demoDungeon2)
    db.session.add(demoDungeon3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_dungeons():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.dungeons RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM dungeons"))

    db.session.commit()
