"use client"

import React, { useState } from 'react'
import EditorHead from "./EditorHead"
import StationList from "./StationList"
import LineList from "./LineList"
import "../type"

const Editor = () => {
    const [setting, setSetting] = useState<settingType>({
        stationList: [],
        lineDict: {},
        iconDict: {}
    })

    return(
        <div>
            <EditorHead setting={setting} setSetting={setSetting}/>
            <StationList setting={setting} setSetting={setSetting}/>
            <LineList/>
        </div>
    )
}

export default Editor