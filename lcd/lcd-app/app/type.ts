type settingType = {
    stationList: stationType[],
    lineDict: { [id: string]: lineType},
    iconDict: {[id: string]: string}
}

type stationType = {
    name: string,
    kana: string,
    eng: string,
    number: string,
    lineColor: string,
    transfers: string
}

type lineType = {
    lineIconKey: string,
    name: string,
    kana: string,
    eng: string
}

type stationMembers = 'name' | 'kana' | 'eng' | 'number' | 'lineColor' | 'transfers'

type lineMembers = 'lineIconKey' | 'name' | 'kana' | 'eng'