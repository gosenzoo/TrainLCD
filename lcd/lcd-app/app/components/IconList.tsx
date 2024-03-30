import React, { useState, useEffect } from 'react'
import "../type"

type iconListProps = {
    setting: settingType,
    setSetting: React.Dispatch<React.SetStateAction<settingType>>
}

const IconList: React.FC<iconListProps> = ({ setting, setSetting }) => {
    const [selectedIndexes, setSelectedIndexes] = useState<number[]>([])
    const [newIconName, setNewIconName] = useState<string>("")
    const [newIconImage, setNewIconImage] = useState<string>("")

    const indexClicked = (e: any) => {
        setSelectedIndexes([e.target.parentNode.rowIndex])
    }
    const iconAddButtonClicked = () => {
        const _setting: settingType = structuredClone(setting)
        if(newIconName === '' || newIconImage === ''){
            alert("アイコン名または画像データが設定されていません")
            return
        }
        if(Object.keys(_setting.iconDict).includes(newIconName)){
            alert("そのアイコン名は既に登録されています")
            return
        }

        _setting.iconDict[newIconName] = newIconImage
        setSetting(_setting)
    }

    const iconNameTextboxChanged = (e: any) => {
        setNewIconName(e.target.value)
    }
    const iconImageInputChanged = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                if(typeof reader.result !== 'string'){
                    return
                }
                setNewIconImage(reader.result);
            }

            reader.readAsDataURL(file);
        }
    }

    return(
        <div>
            アイコン登録
            <div id="iconTableContainer">
                <table id="iconTable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>アイコン</th>
                        </tr>
                    </thead>
                    <tbody id="iconTableBody">
                        {
                            Object.keys(setting.iconDict).map((key, index) => {
                                return(
                                    <tr>
                                        <th className={ selectedIndexes.includes(index + 1) ? 'selected' : '' } onClick={indexClicked}>
                                            {key}
                                        </th>
                                        <td>
                                            <img
                                                src={(setting.iconDict[key] as string) || ""}
                                                alt=""
                                                width="30px"
                                                height="30px"
                                            />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <br></br>
            名前
            <input type="text" id="iconNameTextBox" onChange={iconNameTextboxChanged}></input>
            <br></br>
            <input type="file" id="iconImgInput" onChange={iconImageInputChanged}></input>
            <br></br>
            <button onClick={iconAddButtonClicked}>アイコン追加</button>
        </div>
    )
}

export default IconList