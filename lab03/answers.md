# Lab 3 Answers

## Part 1: Git

### 1.1. List the contents of the lab03-exercises repo immediately after initialization
```
# paste code here
tgroom@arden:~/csci338/lab03-exercises$ ls -la
total 18
drwxr-xr-x  3 tgroom students  4 Sep  5 10:27 .
drwxr-xr-x 10 tgroom students 18 Sep  5 10:21 ..
drwxr-xr-x  7 tgroom students 10 Sep  5 10:27 .git
-rw-r--r--  1 tgroom students  9 Sep  5 10:23 README.md

```

### 1.2. Paste the output of your `git status` command
```
# paste code here
tgroom@arden:~/csci338/lab03-exercises$ git status
On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        README.md

nothing added to commit but untracked files present (use "git add" to track)

```

### 1.3. Paste the output of the state of your repository after committing your README.md file
```
# paste code here
tgroom@arden:~/csci338/lab03-exercises$ git status
On branch master
nothing to commit, working tree clean
tgroom@arden:~/csci338/lab03-exercises$ ls -la
total 18
drwxr-xr-x  3 tgroom students  4 Sep  5 10:27 .
drwxr-xr-x 10 tgroom students 18 Sep  5 10:21 ..
drwxr-xr-x  8 tgroom students 13 Sep  5 10:34 .git
-rw-r--r--  1 tgroom students  9 Sep  5 10:23 README.md

```

### 1.4. Copy your `git log` output
```
# paste code here
tgroom@arden:~/csci338/lab03-exercises$ git log
commit 26f5d5d369caa1449f3739503932431a826b93e6 (HEAD -> master)
Author: Travis Groom <tgroom@arden.cs.unca.edu>
Date:   Thu Sep 5 10:34:14 2024 -0400

    add README.md to the repository

```

### 1.5. Copy your `git diff` output
```
# paste code here
tgroom@arden:~/csci338/lab03-exercises$ git diff
diff --git a/README.md b/README.md
index 80a3926..5646bcf 100644
--- a/README.md
+++ b/README.md
@@ -1 +1,4 @@
 #header1
+
+Find All Duplicates
+Write a function (or static method in the case of Java) that accepts a list of integers and returns a list of only those integers that appear more than once.

```


### 1.6. Reflection

We've learned 6 git subcommands now. Describe each of them in your own words in the section below:

* git init
-Initializes a new git repository
* git status 
-Shows the current state of your directory and what files have been committed or uncommitted
* git add 
-Adds files to be commmited with the git commit command
* git commit 
-Commits changes to the respository
* git log 
* git diff
-Shows differences in your directory in terms of commited and uncommited files, so if you edited a file that was previously commmited, it will show the difference

 
-


### 1.7. Practice: Find All Duplicates (Java)
Make sure you implement the `FindDuplicates.java` class as specified in the instructions (with the nested loops implementation).

## Part 2: GitHub

### 2.1. Practice: Find All Duplicates (Python)
Make sure you implement the `find_duplicates.py` file as specified in the instructions (with the nested loops implementation).


## Part 3: Branching

### 3.1. Implement the More Efficient Version of the "Find Duplicates" problem
Implement the more efficient Version of the "Find Duplicates" problem using a dictionary (or hashmap) data structure instead of nested loops. You may do this in either your Python file or in the Java file that you’ve already made. Do this by adding a second function/method to your Java/Python file with a slightly different name.


### 3.2. Link to Repo
Please make sure that the new repo that you made today on GitHub is public, and paste a link to it below.

```bash
# paste your new repo link here...
https://github.com/tgroom90/lab03-exercises

```

### 3.3. What do the three "Merge pull request" options mean? 
Describe each of them in your own words.

MERGE COMMIT
You do this to merge your feature branch back into your main branch. This option retains the full history of all the commmits for both branches, but it can be more difficult to tell what's going on.

SQUASH AND MERGE
Merges the feature branch into your base branch and combines all the commmits from your feature branch into one big commmit to your main branch. This can potentially be problematic because you can no longer see the precise history of the changes that were made.

REBASE AND MERGE
The Commmits from your feature branch will be added to your main branch and merged. this means that when you look at the commmit history, it shows a linear sequence of all the commmits made on both branches. The downside is that the commits from your feature branch will no longer be differentiated as belonging to the feature branch as opposed to the main branch, so this can be problematic if you're trying to see where something went wrong and whether it was a mistake based in your feature branch or your main branch.
