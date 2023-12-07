from app.models import db, Adventure, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_adventures():
    demoAdventure1 = Adventure(character_id=1, score=100, adventure_type="addition", completed=True)
    demoAdventure2 = Adventure(character_id=2, score=1000, adventure_type="addition", completed=True)
    demoAdventure3 = Adventure(character_id=3, score=10000, adventure_type="addition", completed=True)

    db.session.add(demoAdventure1)
    db.session.add(demoAdventure2)
    db.session.add(demoAdventure3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_adventures():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.adventures RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM adventures"))

    db.session.commit()
