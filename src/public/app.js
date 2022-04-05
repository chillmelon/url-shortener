const App = {
	data() {
		return {
			tagline: "Url Shortener",
			url: "",
			message: "",
		};
	},
	methods: {
		urlShorten() {
			var data = JSON.stringify({
				url: this.url,
				expiration_date: this.expiration_date,
			});

			var config = {
				method: "post",
				url: "http://url.amkongchiau.com/url/",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				data: data,
			};

			axios(config)
				.then((response) => {
					this.tagline = response.data.short_url;
					this.message = "Click the link to copy to clipboard.";
					this.url = "";
				})
				.catch((error) => {
					this.tagline = error;
				});
		},
	},
};
Vue.createApp(App).mount("#app");

var clipboard = new ClipboardJS(".copy");
clipboard.on("success", () => {
	alert("Copied to Clipboard!");
});
