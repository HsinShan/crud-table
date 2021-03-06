<template>
  <v-container>
    <h1 class="header">List of Participants</h1>
    <p class="subtitle">Number of Participants: {{ this.items.length }}</p>
    <v-btn color="info" small class="teal accent-4 addBtn" @click="addItem()">+ Add</v-btn>
    <v-data-table :headers="headers" :items="items" :items-per-page="5" class="elevation-1">
      <template v-slot:item.edit="{ item }">
        <img
          src="../assets/images/edit.svg"
          class="imgBtn"
          width="30px"
          height="30px"
          @click="editItem(item)"
        />
      </template>
      <template v-slot:item.delete="{ item }">
        <img
          src="../assets/images/delete.svg"
          class="imgBtn"
          width="30px"
          height="30px"
          @click="deleteItem(item)"
        />
      </template>
      <template v-slot:no-data>No Data</template>
    </v-data-table>
    <v-layout>
      <v-btn color="info" v-if="items.length > 1" class="teal accent-3 btn" @click="goNext()">Next</v-btn>
      <p class="warningMsg" v-else>Please add more participants !!!</p>
    </v-layout>
    <v-dialog v-model="isOpen" max-width="400">
      <v-card>
        <v-card-title class="headline">{{ getTitle }}</v-card-title>
        <v-card-text>
          <v-form v-model="isValid" ref="form">
            <v-text-field v-model="selectedItem.id" label="No." :rules="idRules"></v-text-field>
            <v-text-field
              v-model="selectedItem.name"
              label="Name"
              :rules="nameRules"
              @change="checkDuplicate()"
              :error-messages="getErrorMsg"
            ></v-text-field>
            <v-text-field v-model="selectedItem.phone" label="Phone" :rules="phoneRules"></v-text-field>
            <v-text-field v-model="selectedItem.email" label="Email" :rules="emailRules"></v-text-field>

            <v-btn color="teal accent-4" text :disabled="!isValid" @click="onSave()">Save</v-btn>
            <v-btn color="grey darken-2" text @click="onCancel()">Close</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="isDelete" max-width="400">
      <v-card>
        <v-card-title class="headline">Warning</v-card-title>
        <v-card-text>Are you sure to delete this participant?</v-card-text>
        <v-card-actions>
          <v-btn color="red darken-1" text @click="onDelete()">Yes</v-btn>
          <v-btn color="grey darken-2" text @click="isDelete = false">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "No.",
          value: "id"
        },
        { text: "Name", value: "name", sortable: false },
        { text: "Phone", value: "phone", sortable: false },
        { text: "Email", value: "email", sortable: false },
        { text: "Edit", value: "edit", sortable: false },
        { text: "Delete", value: "delete", sortable: false }
      ],
      items: [
        {
          id: 1,
          name: "Alice",
          phone: "02-12345678",
          email: "aaa@email.com"
        },
        {
          id: 2,
          name: "Bob",
          phone: "02-12345678",
          email: "bbb@email.com"
        },
        {
          id: 3,
          name: "Candy",
          phone: "02-12345678",
          email: "ccc@email.com"
        },
        {
          id: 4,
          name: "Dobby",
          phone: "02-12345678",
          email: "ddd@email.com"
        },
        {
          id: 5,
          name: "Emily",
          phone: "02-12345678",
          email: "eee@email.com"
        },
        {
          id: 6,
          name: "Fiona",
          phone: "02-12345678",
          email: "fff@email.com"
        }
      ],
      originalItems: [],
      isOpen: false,
      isAdd: false,
      isEdit: false,
      isDelete: false,
      selectedItem: {
        id: null,
        name: "",
        phone: "",
        email: ""
      },
      seletedIndex: -1,
      idRules: [v => !!v || "Serial Number is required"],
      nameRules: [v => !!v || "Name is required"],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      phoneRules: [
        v => !!v || "Phone number is required",
        v =>
          /.([0-9]{2})?([ .-]?)([0-9]{8})/.test(v) ||
          "Format example: 09-11222333"
      ],
      isValid: false,
      isDuplicate: false
    };
  },
  computed: {
    getTitle() {
      if (this.isAdd) {
        return "Add Participant";
      }
      return "Edit Participant's Information";
    },
    getErrorMsg() {
      if (this.isDuplicate) {
        return "The name of this item is duplicate!";
      }
      return "";
    }
  },

  methods: {
    addItem() {
      this.isOpen = true;
      this.isAdd = true;
      this.selectedItem = {
        id: null,
        name: "",
        phone: "",
        email: ""
      };
      this.$nextTick(() => {
        this.$refs.form.resetValidation();
      });
    },
    editItem(item) {
      this.isOpen = true;
      this.isEdit = true;
      this.selectedIndex = this.items.indexOf(item);
      this.selectedItem = Object.assign({}, item);
    },
    deleteItem(item) {
      this.selectedItem = item;
      this.isDelete = true;
    },
    onDelete() {
      this.items.splice(this.items.indexOf(this.selectedItem), 1);
      this.isDelete = false;
    },
    onSave() {
      if (this.isAdd) {
        this.isAdd = false;
        this.items.push(this.selectedItem);
      } else {
        this.isEdit = false;
        this.items.splice(this.selectedIndex, 1, this.selectedItem);
        this.selectedIndex = -1;
      }
      this.isOpen = false;
    },
    onCancel() {
      if (this.isAdd) {
        this.isAdd = false;
      } else {
        this.isEdit = false;
        this.seletedIndex = -1;
      }
      this.isOpen = false;
    },
    checkDuplicate() {
      let list = this.items.filter(item => {
        return item.name === this.selectedItem.name;
      });

      if (
        list.length === 2 ||
        (list.length === 1 && list[0] !== this.seletedIndex)
      ) {
        this.isDuplicate = true;
        return;
      }
      this.isDuplicate = false;
    },
    goNext() {
      this.$router.push({ name: "Lottery" });
    }
  },
  beforeDestroy() {
    this.$bus.$emit("participantList", this.items);
  }
};
</script>
<style lang="scss" scoped>
.addBtn {
  float: right;
}
.v-data-table {
  margin: 60px auto 5px;
  .imgBtn {
    cursor: pointer;
  }
}
.warningMsg {
  width: 100%;
  text-align: center;
  color: red;
  padding: 20px 0px;
}
</style>

