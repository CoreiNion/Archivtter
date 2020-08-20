'use strict';
const submitButton = document.getElementById("submitButton");
const resultAreaDivided = document.getElementById("resultArea");
const tweetAreaDivided = document.getElementById("tweetArea");
const lookSearchButtonDivided = document.getElementById("lookSearchButton");

//作成ボタンが押された時の動作
submitButton.onclick = () => {
    var [userName, sinceDate, untilDate] = getInputValue();
    //入力漏れがない場合は実行
    if(!isInputError(userName, sinceDate, untilDate)){
        var link = generateLink(userName,sinceDate,untilDate);
        //リンク作成でエラーが発生してない場合のみ実行
        if(!(link == 1)){
            //resultAreaとtweetAreaに要素が残ってたらすべて削除
            removeAllChildren(tweetAreaDivided);
            removeAllChildren(resultAreaDivided);
            //resultAreaに結果のメッセージとURLを表示
            const resultText = document.createElement("a");
            const completeText = document.createElement("h5");
            completeText.innerText = "URL作成しました！下のリンクをクリックすれば検索画面を開けます。"
            resultText.href = link;
            //そのままだとリンクが見ずらいので赤色に
            resultText.style = "color: red;"
            resultText.innerText = link;
            resultAreaDivided.appendChild(completeText);
            resultAreaDivided.appendChild(resultText);

            //ツイートボタン
            const twScript = document.createElement('script');
            twScript.setAttribute('src', 'https://platform.twitter.com/widgets.js');
            tweetAreaDivided.appendChild(twScript);
            const tweetButton = document.createElement("a");
            var tweetText = "@" + userName + "の" + sinceDate + "～" + untilDate + "までのツイートです！\n" + 
                          "https://twitter.com/search?q=from%3A" + userName + "%20since%3A" + sinceDate + "%20until%3A" + untilDate + "\n\n" +
                          "作成サイト:"
            tweetButton.setAttribute("href", "https://twitter.com/share?ref_src=twsrc%5Etfw");
            tweetButton.className = "twitter-share-button";
            tweetButton.setAttribute("data-size", "large");
            tweetButton.setAttribute("data-text", tweetText);
            tweetButton.setAttribute("data-url", "https://corenion.github.io/Archivtter/");
            tweetButton.setAttribute("data-hashtags", "Archivtter");
            tweetButton.setAttribute("data-show-count", "false");
            tweetButton.innerText = "ツイートする"
            tweetAreaDivided.appendChild(tweetButton);
        }
    }
};

//Inputを読み取ってValueを返す関数
function getInputValue(){
    const sinceDateInput = document.getElementById("sinceDate")
    const untilDateInput = document.getElementById("untilDate");
    const userNameInput = document.getElementById("userName");
    const userName = userNameInput.value;
    const sinceDate = sinceDateInput.value;
    const untilDate = untilDateInput.value;
    return [userName, sinceDate, untilDate];
}

/**
 * 入力された値をチェックする関数。
 * @param {string} userName ユーザー名
 * @param {string} sinceDate 検索開始の日付
 * @param {string} untilDate 検索終了の日付
 */
function isInputError(userName, sinceDate, untilDate){
    //各種入力された値が空じゃないかのチェック
    if(!userName){
        alert("エラー:ユーザー名を入力してください。");
        return true;
    }
    if(!sinceDate){
        alert("エラー:検索を開始する日付を入力してください。");
        return true;
    }
    if(!untilDate){
        alert("エラー:検索を終了する日付を入力してください。");
        return true;
    }

    //ユーザー名に空白が含まれていないかチェック
    if(userName.match(/ /) || userName.match(/　/)){
        alert("エラー:ユーザー名に空白が含まれています。ユーザー名はTwitterで@から始まる名前ののことです。");
        return true;
    }
    //ユーザー名に英語以外の文字列が含まれていないかのチェック
    var isEnglish = true;
    for(var i=0; i < userName.length; i++){
        if(userName.charCodeAt(i) >= 256) {
          isEnglish = false;
          break;
        }
    }
    if(!isEnglish){
        alert("ユーザー名に英語以外の文字が含まれています。ユーザー名はTwitterで@から始まる名前ののことです。")
        return true;
    }
    return false;
}

/**
 * 検索用のURLを作成する関数。エラーが発生した場合は1を返します。
 * @param {string} account アカウント名
 * @param {string} since 検索開始する日付 yyyy-mm-ddの形である必要がある。
 * @param {string} until 検索終了する日付 yyyy-mm-ddの形である必要がある。
 */
function generateLink(account,since,until){
    var sinceArray = since.match(/^(\d\d\d\d)-(\d\d)-(\d\d)$/);
    var untilArray = until.match(/^(\d\d\d\d)-(\d\d)-(\d\d)$/);
    //yyyy-mm-ddの形になってるかのチェック
    if(sinceArray == null){
        console.error("Error:sinceの値が不正です。値を手入力した場合は、形式が合ってない可能性があります。");
        return 1;
    } else if(untilArray == null){
        alert("Error:untilの値が不正です。値を手入力した場合は、形式が合ってない可能性があります。");
        return 1;
    }
    //範囲がおかしくなってないかのチェック
    if(untilArray[1] - sinceArray[1] <= -1){
        alert("エラー:開始年と終了年が合ってません。")
        return 1;
    //年をまたぐ場合に月/日のチェックをしないようにする
    } else if(untilArray[1] - sinceArray[1] < 1){
        if(untilArray[2] - sinceArray[2] <= -1){
            alert("エラー:開始月と終了月が合ってません。")
            return 1;
        //月をまたぐ場合に日にちのチェックをしないようにする
        } else if(untilArray[2] - sinceArray[2] < 1){
            if(untilArray[3] - sinceArray[3] <= -1){
                alert("エラー:開始日と終了日が合ってません。")
                return 1;
            }
        }
    }
    //from:アカウント名 since:yyyy-mm-dd until:yyyy-mm-ddで検索されるような形にする。
    return "https://twitter.com/search?q=from%3A" + account + "%20since%3A" + since + "%20until%3A" + until;
}

/**
 * 指定した要素の子どもを全て除去する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
    while (element.firstChild) {
      // 子どもの要素があるかぎり除去
      element.removeChild(element.firstChild);
    }
  }