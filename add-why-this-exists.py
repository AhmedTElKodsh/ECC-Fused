import os
import glob
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if '## Why This Exists' in content:
        return
        
    # Find the first ## heading
    # Insert ## Why This Exists before it
    
    match = re.search(r'^(## )', content, re.MULTILINE)
    if match:
        idx = match.start()
        
        why_text = "## Why This Exists\n\nThis document exists to guide you smoothly without overwhelming bureaucracy. It is designed to be a living, conversational document.\n\n"
        
        new_content = content[:idx] + why_text + content[idx:]
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

# Process all SKILL.md
for filepath in glob.glob('skills/*/SKILL.md'):
    process_file(filepath)

# Process all planning templates
for filepath in glob.glob('planning-templates/**/*.md', recursive=True):
    process_file(filepath)

print("Done")
