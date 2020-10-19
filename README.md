# Archivtter

![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/CoreNion/Archivtter) [![GitHub issues](https://img.shields.io/github/issues/CoreNion/Archivtter)](https://github.com/CoreNion/Archivtter/issues)


このサイトでは、Twitterの検索コマンドを用いて、過去のツイートを検索できるURLを発行できます。

N予備校の「[動くWEBページコンテスト 2020夏](https://progedu.github.io/webappcontest/2020/summer/result/)」に提出した作品です。

不具合などは、Issueを立てるか、開発者へ連絡してください。

サイトはこちらです:[https://corenion.github.io/Archivtter/](https://corenion.github.io/Archivtter/)

# 技術的な説明

## 利用しているコマンドについて

Twitterの検索では、コマンドを使って検索できます。

このツールでは、sinceとuntilというコマンドを利用して、過去のツイートを検索できるようにしています。

このsinceとuntilは、sinceには検索範囲の起点の日付を、untilには検索範囲の終点の日付を以下のような形で利用します。

```TwitterSearch
XXXX(検索ワード等)　since:YYYY-MM-DD until:YYYY:MM-DD
```

これで検索ができますが、手入力がやや面倒なため、ツールを作成しました。

## generateLink関数の使い方

generateLinkの引数には、アカウント名と検索開始する日付、検索終了する日付を入れます。

日付は、 yyyy-mm-ddの形である必要があります。

今後、より扱いやすいくするため、アカウント名の記述をを不要にしたり、日付の入力ををDate形式にする予定です。

## ブランチについて

Github Pagesにアップロードしているのはgh-pagesというブランチの方です。

gh-pagesとmasterの違いは、SNS用の画像のタグなどを付けているかなどの違いだけで、JavaScriptやCSSの部分には違いは全くありません。

# 開発者について

**CoreNion** 中学校三年生の人です。

![Twitter Follow](https://img.shields.io/twitter/follow/CoreiNion?style=social) ![GitHub followers](https://img.shields.io/github/followers/CoreNion?style=social)