import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const items = [
	{ text: "Call chiropractor", checked: false },
	{ text: "Do Laundry", checked: false },
	{ text: "Get Groceries", checked: false }
  ];

const workItems = [];
let listImage;

app.get("/", (req, res) => {
  let day = new Date().toLocaleDateString("en-US");
  res.render("index.ejs", {listTitle: day, newListItems: items, listImage: "images/today.jpg"});
});

app.get("/work", (req, res) => {
	res.render("index.ejs", { listTitle: "Work", newListItems: workItems, listImage: "images/work.png" });
  });

app.get("/toggle/:index", (req, res) => {
	const index = parseInt(req.params.index);
	if (!isNaN(index) && index >= 0 && index < items.length) {
	  // Toggle the checked property
	  items[index].checked = !items[index].checked;
	}
	res.redirect("/"); // Redirect back to the / page
  });

  app.get("/work/toggle/:index", (req, res) => {
	const index = parseInt(req.params.index);
	if (!isNaN(index) && index >= 0 && index < workItems.length) {
	  // Toggle the checked property for workItems
	  workItems[index].checked = !workItems[index].checked;
	}
	res.redirect("/work"); // Redirect back to the /work page
  });

app.post("/", (req, res) => {
	const item = req.body.newItem;
	const listType = req.body.list;

	const newItem = { text: item, checked: false };

	if (listType === "Work") {
		workItems.push(newItem);
		res.redirect("/work");
	} else {
		items.push(newItem);
		res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
