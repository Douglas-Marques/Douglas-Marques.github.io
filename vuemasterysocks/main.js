Vue.component("product-details", {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template: `
    <ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>
  `
});

Vue.component("product-review", {
  template: `<form class="review-form" @submit.prevent="onSubmit">
  <p>
    <label for="name">Name:</label>
    <input id="name" v-model="name" placeholder="name" required>
  </p>
  
  <p>
    <label for="review">Review:</label>      
    <textarea id="review" v-model="review" required></textarea>
  </p>
  
  <p>
    <label for="rating">Rating:</label>
    <select id="rating" v-model.number="rating" required>
      <option>5</option>
      <option>4</option>
      <option>3</option>
      <option>2</option>
      <option>1</option>
    </select>
  </p>
      
  <p>
    <input type="submit" value="Submit">  
  </p>    

</form>`,
  data() {
    return {
      name: null,
      review: null,
      rating: null
    };
  },
  methods: {
    onSubmit() {
      let productReview = {
        name: this.name,
        review: this.review,
        rating: this.rating
      };
      this.$emit("review-submitted", productReview);
      this.name = null;
      this.review = null;
      this.rating = null;
    }
  }
});

Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
  <div class="product">
    <div class="product-image"><img :src="image" :alt="product.altText"></div>
    <div class="product-info">
      <h1>{{ title }}</h1>
      <p>{{ product.description }}</p>
      <p v-if="inStock">In stock</p>
      <p v-else>Out of Stock</p>
      <p>Shipping: {{ shipping }}</p>
      <product-details :details="product.details"></product-details>
      <div v-for="(variant, index) in product.variants" :key="variant.id" class="color-box" :style="{backgroundColor: variant.variantColor}"
        @mouseover='updateProduct(index)'>
      </div>
      <button v-on:click="addToCart" :disabled="!inStock" :class='{disabledButton: !inStock}'>Add to
        Cart
      </button>   
      <button v-on:click="removeFromCart" :disabled="!inStock" :class='{disabledButton: !inStock}'>Remove from
        Cart
      </button>      
    </div>
    <div>
      <h2>Reviews</h2>
      <p v-if="product.reviews.length === 0">There are no reviews yet.</p>
      <ul v-else>
        <li v-for="review in product.reviews">
          <p>{{ review.name }}</p>
          <p>{{ review.rating }}</p>
          <p>{{ review.review }}</p>
        </li>
      </ul>
    </div>
    <product-review @review-submitted="addReview"></product-review>
  </div>`,
  data() {
    return {
      product: {
        name: "Socks",
        description: "A pair of warm, fuzzy socks",
        selectedVariant: 0,
        altText: "A pair of socks",
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        brand: "Vue Mastery",
        variants: [
          {
            variantId: 2234,
            variantColor: "green",
            variantImage: "./assets/vmSocks-green.jpeg",
            variantQuantity: 45
          },
          {
            variantId: 2235,
            variantColor: "blue",
            variantImage: "./assets/vmSocks-blue.jpeg",
            variantQuantity: 0
          }
        ],
        reviews: []
      }
    };
  },
  methods: {
    addToCart() {
      this.$emit(
        "add-to-cart",
        this.product.variants[this.product.selectedVariant].variantId
      );
    },
    removeFromCart() {
      this.$emit(
        "remove-from-cart",
        this.product.variants[this.product.selectedVariant].variantId
      );
    },
    updateProduct(index) {
      this.product.selectedVariant = index;
    },
    addReview(productReview) {
      this.product.reviews.push(productReview);
    }
  },
  computed: {
    title() {
      return `${this.product.brand} ${this.product.name}`;
    },
    image() {
      return this.product.variants[this.product.selectedVariant].variantImage;
    },
    inStock() {
      return this.product.variants[this.product.selectedVariant]
        .variantQuantity;
    },
    shipping() {
      if (this.premium) return "Free";
      return 2.99;
    }
  }
});

var app = new Vue({
  el: "#app",
  data: {
    premium: true,
    cart: []
  },
  methods: {
    updateCart(id) {
      this.cart.push(id);
    },
    removeItem(removeId) {
      this.cart.pop();
    }
  }
});
