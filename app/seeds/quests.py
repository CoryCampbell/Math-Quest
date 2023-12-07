from app.models import db, Quest, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_quests():
    demoQuest1 = Quest(character_id=1, quest_id=1, quest_name='Start a new adventure!')
    demoQuest2 = Quest(character_id=2, quest_id=1, quest_name='Start a new adventure!')
    demoQuest3 = Quest(character_id=3, quest_id=1, quest_name='Start a new adventure!')
    demoQuest4 = Quest(character_id=1, quest_id=2, quest_name='Start a new Dungeon Run!')
    demoQuest5 = Quest(character_id=2, quest_id=2, quest_name='Start a new Dungeon Run!')
    demoQuest6 = Quest(character_id=3, quest_id=2, quest_name='Start a new Dungeon Run!')

    db.session.add(demoQuest1)
    db.session.add(demoQuest2)
    db.session.add(demoQuest3)
    db.session.add(demoQuest4)
    db.session.add(demoQuest5)
    db.session.add(demoQuest6)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_quests():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.quests RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM quests"))

    db.session.commit()
