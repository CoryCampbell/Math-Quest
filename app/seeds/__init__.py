from flask.cli import AppGroup
from .users import seed_users, undo_users
from .characters import seed_characters, undo_characters
from .adventures import seed_adventures, undo_adventures
from .owned_items import seed_owned_items, undo_owned_items
from .leaderboard import seed_leaderboard, undo_leaderboard
from .statistics import seed_statistics, undo_statistics
from .dungeons import seed_dungeons, undo_dungeons
from .quests import seed_quests, undo_quests

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_leaderboard()
        undo_dungeons()
        undo_quests()
        undo_adventures()
        undo_statistics()
        undo_owned_items()
        undo_characters()
        undo_users()
    seed_users()
    seed_characters()
    seed_owned_items()
    seed_statistics()
    seed_adventures()
    seed_quests()
    seed_dungeons()
    seed_leaderboard()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # Add other undo functions here
