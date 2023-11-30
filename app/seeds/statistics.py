from app.models import db, Statistic, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_statistics():
    demoStatistic1 = Statistic(character_id=1, highest_score=100,  total_enemies_defeated=10, dungeon_levels_traveled=1, quests_completed=2, potions_used=1, bosses_defeated=1)
    demoStatistic2 = Statistic(character_id=2, highest_score=1000, total_enemies_defeated=100, dungeon_levels_traveled=10, quests_completed=2, potions_used=1, bosses_defeated=10)
    demoStatistic3 = Statistic(character_id=3, highest_score=10000,total_enemies_defeated=1000, dungeon_levels_traveled=100, quests_completed=2, potions_used=1, bosses_defeated=100)

    db.session.add(demoStatistic1)
    db.session.add(demoStatistic2)
    db.session.add(demoStatistic3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_statistics():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.statistics RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM statistics"))

    db.session.commit()
