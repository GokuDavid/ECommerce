import { createStore } from "vuex";

export default createStore({
  state: {
    cart: {
      items: [],
    },
    isAuthenticated: false,
    token: "",
    isLoading: false,
  },
  getters: {},
  mutations: {
    //初始化购物车公共数据
    initializeStore(state) {
      if (localStorage.getItem("cart")) {
        state.cart = JSON.parse(localStorage.getItem("cart"));
      } else {
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
      if (localStorage.getItem("token")) {
        state.token = localStorage.getItem("token");
        state.isAuthenticated = true;
      } else {
        state.token = "";
        state.isAuthenticated = false;
      }
    },
    //添加物品到购物车公共数据
    addToCart(state, item) {
      const exists = state.cart.items.filter(
        (i) => i.product.id === item.product.id
      );
      if (exists.length) {
        exists[0].quantity =
          parseInt(exists[0].quantity) + parseInt(item.quantity);
      } else {
        state.cart.items.push(item);
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    //设置加载状态
    setIsLoading(state, status) {
      state.isLoading = status;
    },
    setToken(state, token) {
      state.token = token;
      state.isAuthenticated = true;
    },
    removeToken(state, token) {
      state.token = '';
      state.isAuthenticated = false;
    },
  },
  actions: {},
  modules: {},
});
