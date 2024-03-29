import React from "react"
import "../type"

type editorHeadType = {
    setting: settingType,
    setSetting: React.Dispatch<React.SetStateAction<settingType>>
}

const EditorHead: React.FC<editorHeadType> = ({setting, setSetting}) => {
    const inputToSetting = (e: any) => {
        try{
            const file = e.target.files[0]
            console.log("開始")

            if (file) {
                const reader = new FileReader()
                reader.onload = (ee: any) => {
                    try {
                        setSetting(JSON.parse(ee.target.result))
                    }
                    catch (err) {
                        console.error('setting読み込み時にエラーが発生')
                    }
                }
                reader.readAsText(file);
            }
        }
        catch(err){
            console.error('setting読み込み時にエラーが発生')
        }
    }
    
    const downloadFromSettings = () => {
        if (setting) {
            const blob = new Blob([JSON.stringify(setting, null, ' ')], {type: 'application\/json'});
            const downloadUrl = URL.createObjectURL(blob);
            const downloadLink = document.createElement("a");
            downloadLink.href = downloadUrl;
            downloadLink.download = "設定.json";
            downloadLink.click();
        }
    }
    const openDisplay = () => {
        localStorage.setItem('lcdStrage', JSON.stringify(setting))
        window.open('./Display.html')
    }

    return(
        <div>
            <input id="settingInput" type="file" onChange={inputToSetting}></input>
            <button onClick={downloadFromSettings}>設定をダウンロード</button>
            <button onClick={openDisplay}>表示</button>
        </div>
    )
}

export default EditorHead