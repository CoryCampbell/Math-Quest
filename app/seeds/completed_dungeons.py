from app.models import db, CompletedDungeon, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_completed_dungeons():
    demoCompletedDungeon1 = CompletedDungeon(character_id=1, dungeon_id=1, dungeon_name='demo_dungeon', score=100)
    demoCompletedDungeon2 = CompletedDungeon(character_id=2, dungeon_id=1, dungeon_name='demo_dungeon', score=1000)
    demoCompletedDungeon3 = CompletedDungeon(character_id=3, dungeon_id=1, dungeon_name='demo_dungeon', score=10000)

    db.session.add(demoCompletedDungeon1)
    db.session.add(demoCompletedDungeon2)
    db.session.add(demoCompletedDungeon3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_completed_dungeons():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.completed_dungeons RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM completed_dungeons"))

    db.session.commit()
