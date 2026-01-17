import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# mock database URL for testing
os.environ["DATABASE_URL"] = "sqlite:///:memory:"
