Table users {
  id VARCHAR(255) [pk] // Auth0 user_id (e.g., "auth0|12345")
  name VARCHAR(100)
  anonymous_name VARCHAR(100) [unique] // For introvert-friendly anonymity
  profile TEXT // Bio or description
  skill_level VARCHAR(50) // e.g., "beginner", "intermediate", "expert"
  interests TEXT[] // Array of interests (e.g., ["javascript", "python"])
  mood VARCHAR(50) // e.g., "motivated", "stressed"
  status VARCHAR(50) [default: 'active'] // e.g., "active", "inactive"
  created_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
  updated_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}
Table code_requests {
  id SERIAL [pk]
  user_id VARCHAR(255) [ref: - users.id] // Links to Auth0 user_id
  skill_level_required VARCHAR(50) // Skill level for helpers
  content TEXT
  language VARCHAR(50)
  urgent_toggle BOOLEAN [default: false] // Priority flag
  problem_description TEXT // Context for the issue
  is_open BOOLEAN [default: true] // Public ("open") or skill-match only
  status VARCHAR(20) [default: 'unsolved'] // "unsolved", "solved"
  created_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
  updated_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}

Table code_solutions {
  id SERIAL [pk]
  request_id INT [ref: > code_requests.id] // Links to request
  helper_id VARCHAR(255) [ref: > users.id] // Auth0 user_id of helper
  version INT
  solution TEXT
  explanation TEXT
  solution_accepted BOOLEAN [default: false] // Accepted by OP
  created_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}