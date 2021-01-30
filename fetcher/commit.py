import subprocess as cmd

cp = cmd.run("git add .", check=True, shell=True)

cp = cmd.run(f"git commit -m 'Daily fetch from PC'", check=True, shell=True)
cp = cmd.run("git push -u origin master -f", check=True, shell=True)
