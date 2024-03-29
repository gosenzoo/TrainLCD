import React, { useState, useEffect } from 'react'
import "../type"

type stationListProps = {
    setting: settingType,
    setSetting: React.Dispatch<React.SetStateAction<settingType>>
}

const StationList: React.FC<stationListProps> = ({setting, setSetting}) => {
    const [isMultiSelect, setIsMultiSelect] = useState<boolean>(false)
    const [selectedIndexes, setSelectedIndexes] = useState<number[]>([])

    const test = useEffect(() => console.log(selectedIndexes), [selectedIndexes])

    const indexClicked = (e: any) => {
        if (!isMultiSelect) {
            setSelectedIndexes([e.target.parentNode.rowIndex])
        }
        else {
            if(selectedIndexes.includes(e.target.parentNode.rowIndex)){
                setSelectedIndexes([...selectedIndexes].filter(item => item !== e.target.parentNode.rowIndex))
            }
            else{
                const _selectedIndexes: number[] = [...selectedIndexes]
                _selectedIndexes.push(e.target.parentNode.rowIndex)
                setSelectedIndexes(_selectedIndexes)
            }
        }
    }
    const addStation = () => {
        if(!setting.stationList){
            return
        }
        const _setting: settingType = structuredClone(setting)
        let _color: string = ""
        if (_setting.stationList.length > 0) {
            _color = _setting.stationList[selectedIndexes[selectedIndexes.length - 1] - 1].lineColor
        }
        let _index = 0
        if(selectedIndexes.length > 0){
            _index = selectedIndexes[selectedIndexes.length - 1]
        }
        _setting.stationList.splice(_index, 0, {
            name: "",
            kana: "",
            eng: "",
            number: "",
            lineColor: _color,
            transfers: ""
        })
        setSetting(_setting)
    }
    const deleteStation = () => {
        const _setting = structuredClone(setting)
        selectedIndexes.sort((a, b) => b - a)
        selectedIndexes.forEach(ind => {
            _setting.stationList.splice(ind - 1, 1)
        });

        setSelectedIndexes([])
        setSetting(_setting)
    }
    const multiSelectCheckboxClicked = (e: any) => {
        setIsMultiSelect(e.target.checked)
    }
    const allSelectButtonClicked = () => {
        if (setting.stationList.length === 0) {
            return
        }
    
        if (selectedIndexes.length === setting.stationList.length) {
            setSelectedIndexes([])
        }
        else {
            let _selectedIndexes = []
            for (let i = 1; i <= setting.stationList.length; i++) {
                _selectedIndexes.push(i)
            }
            setSelectedIndexes(_selectedIndexes)
        }
    }

    const formUpdated = (e:any, field: stationMembers) => {
        if(!setting){
            return
        }

        const _setting: settingType = structuredClone(setting)

        selectedIndexes.forEach(ind => {
            if(!_setting.stationList[ind - 1]){
                return
            }
            if(!(field in _setting.stationList[ind - 1])){
                return
            }
            _setting.stationList[ind - 1][field] = e.target.value
        })
        
        setSetting(_setting)
    }

    return(
        <div>
            <div id="stationsTableContainer">
                <table id="stationsTable">
                    <thead>
                        <tr>
                            <th>通過</th>
                            <th>駅名</th>
                            <th>駅名かな</th>
                            <th>駅名英語</th>
                            <th>ナンバリング</th>
                            <th>乗換路線</th>
                        </tr>
                    </thead>
                    <tbody id="stationsTableBody">
                        {
                            setting?.stationList.map((station, index) => (
                                <tr key={index}>
                                    <th>
                                        <input type="checkbox"></input>
                                    </th>
                                    <th className={ selectedIndexes.includes(index + 1) ? 'selected' : '' } onClick={indexClicked}>
                                        {station?.name}
                                    </th>
                                    <td>
                                        {station?.kana}
                                    </td>
                                    <td>
                                        {station?.eng}
                                    </td>
                                    <td style={{backgroundColor: station?.lineColor}}>
                                        {station?.number}
                                    </td>
                                    <td>
                                        {station?.transfers.split(" ").length}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <button>上に移動</button>
            <button>下に移動</button>
            <button onClick={addStation}>駅追加</button>
            <button onClick={deleteStation}>駅削除</button>
            複数選択
            <input type="checkbox" onChange={multiSelectCheckboxClicked}></input>
            <button onClick={allSelectButtonClicked}>全選択/解除</button>

            <div>
                駅名
                <input type="text" id="nameInput" onChange={(e) => formUpdated(e, 'name')}
                    value={ setting && selectedIndexes.length > 0 ? setting.stationList[selectedIndexes[selectedIndexes.length - 1] - 1]?.name : ''}
                ></input>
                <br></br>
                駅名かな
                <input type="text" id="kanaInput" onChange={(e) => formUpdated(e, 'kana')}
                    value={ setting && selectedIndexes.length > 0 ? setting.stationList[selectedIndexes[selectedIndexes.length - 1] - 1]?.kana : ''}
                ></input>
                <br></br>
                駅名英語
                <input type="text" id="engInput" onChange={(e) => formUpdated(e, 'eng')}
                    value={ setting && selectedIndexes.length > 0 ? setting.stationList[selectedIndexes[selectedIndexes.length - 1] - 1]?.eng : ''}
                ></input>
                <br></br>
                駅ナンバリング
                <input type="text" id="numberInput" onChange={(e) => formUpdated(e, 'number')}
                    value={ setting && selectedIndexes.length > 0 ? setting.stationList[selectedIndexes[selectedIndexes.length - 1] - 1]?.number : ''}
                ></input>
                <br></br>
                路線カラー
                <input type="color" id="lineColorInput" onChange={(e) => formUpdated(e, 'lineColor')}
                    value={ setting && selectedIndexes.length > 0 ? setting.stationList[selectedIndexes[selectedIndexes.length - 1] - 1]?.lineColor : ''}
                ></input>
                <br></br>
                乗換路線
                <input type="text" id="transfersInput" onChange={(e) => formUpdated(e, 'transfers')}
                    value={ setting && selectedIndexes.length > 0 ? setting.stationList[selectedIndexes[selectedIndexes.length - 1] - 1]?.transfers : ''}
                ></input>
            </div>
        </div>
    )
}

export default StationList