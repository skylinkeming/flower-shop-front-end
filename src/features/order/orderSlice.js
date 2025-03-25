import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Config } from "../../util/Constants";

const initialState = {
  isLoading: false,
  orderList: [],
  editOrder: {
    _id: "",
    products: [],
    totalPrice: 0,
    imageUrl: "",
    isPaid: 0,
    shippingStatus: 0,
    phone: "",
    address: "",
    date: "",
    client: {
      _id: "",
      name: "",
      phone: "",
      cellPhone: "",
      address: "",
      note: "",
    },
    note: "",
    scheduledOrder:""
  },
  error: "",
  totalPages: 1,
};

export const fetchOrders = createAsyncThunk(
  "client/fetchOrders",
  async (payload, thunkAPI) => {
    try {
      let queryString = "";
      let sortCondition = payload.sortCondition;

      if (sortCondition) {
        if (sortCondition.address) {
          queryString += `&addressOrder=${sortCondition.address}`;
        } else if (sortCondition.products) {
          queryString += `&productsOrder=${sortCondition.products}`;
        } else if (sortCondition.clientName) {
          queryString += `&clientNameOrder=${sortCondition.clientName}`;
        } else if (sortCondition.totalPrice) {
          queryString += `&totalPriceOrder=${sortCondition.totalPrice}`;
        } else if (sortCondition.isPaid) {
          queryString += `&isPaidOrder=${sortCondition.isPaid}`;
        } else if (sortCondition.shippingStatus) {
          queryString += `&shippingStatusOrder=${sortCondition.shippingStatus}`;
        } else if (sortCondition.date) {
          queryString += `&dateOrder=${sortCondition.date}`;
        }
      }

      if (payload.searchKey) {
        queryString += "&searchKey=" + payload.searchKey;
      }
      if (payload.dateRange && payload.dateRange.length>1) {
        queryString += `&startDate=${payload.dateRange[0]}&endDate=${payload.dateRange[1]}`;
      }

      const response = await axios.get(
        Config.url.API_URL + "/feed/orders?page=" + payload.page + queryString
      );
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    updateSearchKey: (state, action) => {
      state.searchKey = action.payload;
    },
    setEditOrder: (state, action) => {
      state.editOrder = action.payload;
    },
    updateEditOrder: (state, action) => {
      state.editOrder = { ...state.editOrder, ...action.payload };
    },
    updateEditOrderProduct: (state, action) => {
      let targetProduct = state.editOrder.products[action.payload.index];
      Object.keys(action.payload).forEach((key) => {
        if (key !== "index") {
          targetProduct[key] = action.payload[key];
        }
      });
    },
    clearEditOrder: (state) => {
      state.editOrder = {
        _id: "",
        products: [],
        totalPrice: 0,
        imageUrl: "",
        isPaid: 0,
        shippingStatus: 0,
        phone: "",
        date: "",
        address: "",
        client: {},
        note: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        let parseOrders = action.payload.data.orders.map((order) => {
          return { ...order, products: JSON.parse(order.products) };
        });
        state.orderList = parseOrders;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.response.data.message;
        alert(action.payload.response.data.message);
      });
  },
});

export const {
  updateSearchKey,
  setEditOrder,
  updateEditOrder,
  updateEditOrderProduct,
  clearEditOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
