from app.models import db, CompletedQuest, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_completed_quests():
    demoCompletedQuest1 = CompletedQuest(character_id=1, quest_id=1, quest_name='Start a new adventure!')
    demoCompletedQuest2 = CompletedQuest(character_id=2, quest_id=1, quest_name='Start a new adventure!')
    demoCompletedQuest3 = CompletedQuest(character_id=3, quest_id=1, quest_name='Start a new adventure!')
    demoCompletedQuest4 = CompletedQuest(character_id=1, quest_id=2, quest_name='Start a new Dungeon Run!')
    demoCompletedQuest5 = CompletedQuest(character_id=2, quest_id=2, quest_name='Start a new Dungeon Run!')
    demoCompletedQuest6 = CompletedQuest(character_id=3, quest_id=2, quest_name='Start a new Dungeon Run!')

    db.session.add(demoCompletedQuest1)
    db.session.add(demoCompletedQuest2)
    db.session.add(demoCompletedQuest3)
    db.session.add(demoCompletedQuest4)
    db.session.add(demoCompletedQuest5)
    db.session.add(demoCompletedQuest6)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_completed_quests():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.completed_quests RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM completed_quests"))

    db.session.commit()
