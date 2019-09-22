<template>
  <v-container>
    <v-btn small color="primary" @click="addItem()">+ Add Item</v-btn>

    <v-data-table :headers="headers" :items="items" :items-per-page="10" class="elevation-1">
      <template v-slot:item.edit="{ item }">
        <img src="../assets/edit.svg" width="30px" height="30px" @click="editItem(item)">
      </template>
      <template v-slot:item.delete="{ item }">
        <img src="../assets/delete.svg" width="30px" height="30px" @click="deleteItem(item)">
      </template>
      <template v-slot:no-data>No Data</template>
    </v-data-table>

    <v-dialog v-model="isOpen">
      <v-card>
        <v-card-title class="headline">{{ getTitle }}</v-card-title>
        <v-card-text>
          <v-form v-model="isValid">
            <v-text-field v-model="selectedItem.id" label="No." :rules="idRules"></v-text-field>
            <v-text-field v-model="selectedItem.name" label="Name" :rules="nameRules"></v-text-field>
            <v-text-field v-model="selectedItem.phone" label="Phone" :rules="phoneRules"></v-text-field>
            <v-text-field v-model="selectedItem.email" label="Email" :rules="emailRules"></v-text-field>

            <v-btn color="blue darken-1" text :disabled="!isValid" @click="onSave()">Save</v-btn>
            <v-btn color="blue darken-1" text @click="onCancel()">Close</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="isDelete" max-width="400">
      <v-card>
        <v-card-title class="headline">Are you sure to delete this item?</v-card-title>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="onDelete()">Yes</v-btn>
          <v-btn color="red darken-1" text @click="isDelete = false">No</v-btn>
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
          align: "left",
          value: "id"
        },
        { text: "Name", value: "name", sortable: false },
        { text: "Phone", value: "phone", sortable: false },
        { text: "Email", value: "email", sortable: false },
        { text: "edit", value: "edit", sortable: false },
        { text: "delete", value: "delete", sortable: false }
      ],
      items: [
        {
          id: 1,
          name: "User1",
          phone: "02-12345678",
          email: "aaa@email.com"
        },
        {
          id: 2,
          name: "User2",
          phone: "02-12345678",
          email: "bbb@email.com"
        },
        {
          id: 3,
          name: "User3",
          phone: "02-12345678",
          email: "ccc@email.com"
        },
        {
          id: 4,
          name: "User4",
          phone: "02-12345678",
          email: "ddd@email.com"
        },
        {
          id: 5,
          name: "User5",
          phone: "02-12345678",
          email: "eee@email.com"
        },
        {
          id: 6,
          name: "User6",
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
      isValid: false
    };
  },
  computed: {
    getTitle() {
      if (this.isAdd) {
        return "Add New Item";
      }
      return "Editting";
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
    },
    editItem(item) {
      this.isOpen = true;
      this.isEdit = true;
      this.items.forEach(item => {
        this.originalItems.push(Object.assign({}, item));
      });
      this.selectedItem = item;
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
      }
      this.isOpen = false;
    },
    onCancel() {
      if (this.isAdd) {
        this.isAdd = false;
      } else {
        this.isEdit = false;
        console.log(this.originalItems);
        this.items = [...this.originalItems];
      }
      this.isOpen = false;
    }
  }
};
</script>
