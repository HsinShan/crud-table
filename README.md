# crud-table

此專案是以 CRUD table 發想的小型抽獎平台 - 「**Lucky Draw System**」  
提供簡單、快速又有趣的抽獎工具

## 如何使用

### Project setup

```
git clone https://github.com/HsinShan/crud-table.git
npm install
```

Compiles and hot-reloads for development

```
npm run serve
```

### How to Use?

→ 一開始進入畫面為專案首頁，點擊 **Enter** 即可進入參加名單(List of Participants) 頁面。  
→ 在進入**參加名單(List of Participants)** 頁面後，即可查看已參加的抽獎者名單，也可以依需求**新增**、**修改**或**刪除**參加者。  
→ 確認完參加名單後，點擊 **Next** 即可進入抽獎畫面。  
→ 按下 Start 即開始抽獎，抽完點擊 **OK** 即可查看得獎者的資訊。若要重新抽獎按下 **Restart** 即可回到參加名單(List of Participants) 頁面，重新開始抽獎。

## Design Principle

1. 簡單且容易使用
2. 一致性: 主色調為 rgba(64, 172, 119, 1)
3. 主要目的: 提供抽獎工具

### About this Project

1. 使用 Vue
2. UI framework 使用 Vuetify
3. slotMachine.vue 是基於 [@puckwang/vue-slot-machine](https://www.npmjs.com/package/@puckwang/vue-slot-machine) 來做客製化使用
