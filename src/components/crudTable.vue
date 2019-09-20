<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="10"
      class="elevation-1"
    >
      
      <template v-slot:item.edit="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="openEditDialog(item)"
        >
          edit
        </v-icon>
      </template>
      <template v-slot:item.delete="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="deleteItem(item.name)"
        >
          delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        No Data
      </template>
    </v-data-table>
    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">Editting</v-card-title>

        <v-card-text>
          <v-text-field
            v-model="selectedItem.content.id"
            label="No."
            required
          ></v-text-field>
          <v-text-field
            v-model="selectedItem.content.name"
            label="Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="selectedItem.content.phone"
            label="Phone"
            required
          ></v-text-field>
          <v-text-field
            v-model="selectedItem.content.email"
            label="Email"
            required
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="updateItem()">Save</v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      headers: [
        {
          text: 'No.',
          align: 'left',
          sortable: false,
          value: 'id',
        },
        { text: 'Name', value: 'name' },
        { text: 'Phone', value: 'phone' },
        { text: 'Email', value: 'email' },
        { text: 'edit', value: 'edit' },
        { text: 'delete', value: 'delete' },
      ],
      items: [
        {
          id: 1,
          name: 'User1',
          phone: '02-12345678',
          email: 'aaa@email.com',
        },
        {
          id: 2,
          name: 'User2',
          phone: '02-12345678',
          email: 'bbb@email.com',
        },
        {
          id: 3,
          name: 'User3',
          phone: '02-12345678',
          email: 'ccc@email.com',
        },
        {
          id: 4,
          name: 'User4',
          phone: '02-12345678',
          email: 'ddd@email.com',
        },
        {
          id: 5,
          name: 'User5',
          phone: '02-12345678',
          email: 'eee@email.com',
        },
        {
          id: 6,
          name: 'User6',
          phone: '02-12345678',
          email: 'fff@email.com',
        }
      ],
      dialog: false,
      selectedItem: {
        index: 0,
        content: {
          id: 1,
          name: 'User1',
          phone: '02-12345678',
          email: 'aaa@email.com',
        }
      }
    }
  },
  methods: {
    openEditDialog (item) {
      this.dialog = true
      this.selectedItem.index = this.items.findIndex((i) => {
        return i.name === item.name
      })
      this.selectedItem.content = Object.assign({}, item)
    },
    updateItem () {
      this.items.splice(this.selectedItem.index, 1, this.selectedItem.content)
      this.dialog = false
    },
    deleteItem (name) {
      let index = this.items.findIndex((item) => {
        return item.name === name
      })
      this.items.splice(index,1)
    }
  }
};
</script>
