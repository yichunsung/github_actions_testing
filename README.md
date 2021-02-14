# Github actions testing


### GCE SSH Key

1. Create new Key in local side.

[GCP Doc](https://cloud.google.com/compute/docs/instances/adding-removing-ssh-keys#createsshkeys)

> DO NOT Enter any password for deployment usage.

2. Crypt Key

`gpg --symmetric --cipher-algo AES256 ~/.ssh/your_key`

3. `git push` to git


### Append secrets

1. go to repo `settings`.

2. to `secrets` tab

3. add `PASSPHRASE` and paste your gpg decrypt password

4. save

### Modified workflow

In /.github/workflows/main.yml

> Add `secrets.PASSPHRASE` for ssh key


```yml

name: CI

on: [push]

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2
    - name: Run a one-line script
      run: echo Hello, world!
    - name: decrypt
      run: |
        mkdir $HOME/secrets
        gpg --quiet --batch --yes --decrypt --passphrase="$PASSPHRASE" \
        --output $HOME/secrets/key google_compute_engine.gpg
      env:
        PASSPHRASE: ${{ secrets.PASSPHRASE }}
    - name: test key
      run: ls $HOME/secrets/key
    - name: chmod
      run: chmod 600 $HOME/secrets/key
    - name: ssh
      run: ssh -o StrictHostKeyChecking=no -i $HOME/secrets/key sarahcheng@35.229.180.75 "cd action_ci/;git pull"  

```

### private github repo settings

-> profile > Settings > Developer settings > Personal access tokens

create new token and paste to repo secrets name ACCESS_TOKEN

```yml

- name: ssh
  env:
    ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
  run: | 
    ssh -o StrictHostKeyChecking=no -i $HOME/secrets/key ycsung.r@34.69.64.194 "cd game_frontend/;git pull https://$ACCESS_TOKEN:x-oauth-basic@github.com/USER_NAME/xxxx.git

```

### Reference

1. https://ithelp.ithome.com.tw/articles/10229844

2. https://sysadmins.co.za/clone-a-private-github-repo-with-personal-access-token/
