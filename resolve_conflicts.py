import os
import re

def resolve_conflicts(directory):
    # Regex to capture the content between ======= and >>>>>>>
    # Note: re.DOTALL makes . match newlines
    conflict_pattern = re.compile(r'(.*?).*?\n?', re.DOTALL)
    
    count = 0
    for root, dirs, files in os.walk(directory):
        if '.git' in dirs:
            dirs.remove('.git')  # Don't recurse into .git
            
        for file in files:
            file_path = os.path.join(root, file)
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                if '<<<<<<< HEAD' in content:
                    print(f"Resolving conflicts in {file_path}")
                    new_content = conflict_pattern.sub(r'\1', content)
                    
                    with open(file_path, 'w', encoding='utf-8', newline='') as f:
                        f.write(new_content)
                    count += 1
            except (UnicodeDecodeError, PermissionError):
                continue
                
    print(f"Resolved conflicts in {count} files.")

if __name__ == "__main__":
    current_dir = os.getcwd()
    resolve_conflicts(current_dir)
