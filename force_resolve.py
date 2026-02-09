import os
import subprocess

def force_resolve():
    # Find files with conflict markers using grep
    # We use git grep since it's faster, but we need to check staged/working
    # Simple recursive python search is reliable.
    
    files_with_conflicts = []
    for root, dirs, files in os.walk('.'):
        if '.git' in dirs:
            dirs.remove('.git')
        
        for file in files:
            file_path = os.path.join(root, file)
            try:
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    if '<<<<<<< HEAD' in f.read():
                        files_with_conflicts.append(os.path.relpath(file_path))
            except Exception:
                pass
                
    if not files_with_conflicts:
        print("No files with conflict markers found.")
        return

    print(f"Found {len(files_with_conflicts)} files with markers.")
    
    # Checkout from the specific commit
    commit_hash = "6dbc2f7"
    for file_path in files_with_conflicts:
        print(f"Checking out {file_path} from {commit_hash}...")
        try:
            subprocess.run(["git", "checkout", commit_hash, "--", file_path], check=True, shell=True)
        except subprocess.CalledProcessError as e:
            print(f"Failed to checkout {file_path}: {e}")

if __name__ == "__main__":
    force_resolve()
