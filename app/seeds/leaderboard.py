from app.models import db, LeaderboardItem, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_leaderboard():
    demoLeaderboardItem1 = LeaderboardItem(character_id=1, high_score=100, username='Demo', game_type='Dungeon')
    demoLeaderboardItem2 = LeaderboardItem(character_id=2, high_score=1000, username='CoryCampbell', game_type='Dungeon')
    demoLeaderboardItem3 = LeaderboardItem(character_id=3, high_score=1001, username='?!?!?!?!?!?!?!', game_type='Dungeon')
    demoLeaderboardItem4 = LeaderboardItem(character_id=3, high_score=1001, username='?????????', game_type='Adventure')
    demoLeaderboardItem5 = LeaderboardItem(character_id=3, high_score=3000, username='LordFrest', game_type='Dungeon')

    db.session.add(demoLeaderboardItem1)
    db.session.add(demoLeaderboardItem2)
    db.session.add(demoLeaderboardItem3)
    db.session.add(demoLeaderboardItem4)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_leaderboard():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.leaderboard RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM leaderboard"))

    db.session.commit()
