from app.models import db, OwnedItem, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_owned_items():
    demoOwnedItem1 = OwnedItem(character_id=1, item_id=1, item_type='potion', quantity=10)
    demoOwnedItem2 = OwnedItem(character_id=2, item_id=1, item_type='potion', quantity=100)
    demoOwnedItem3 = OwnedItem(character_id=3, item_id=1, item_type='potion', quantity=1000)

    db.session.add(demoOwnedItem1)
    db.session.add(demoOwnedItem2)
    db.session.add(demoOwnedItem3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_owned_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.owned_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM owned_items"))

    db.session.commit()
