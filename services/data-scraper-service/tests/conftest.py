import os
import sys

# mock database URL for testing
os.environ["DATABASE_URL"] = "sqlite:///:memory:"

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
