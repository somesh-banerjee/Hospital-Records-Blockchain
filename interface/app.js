import express from "express";
import upload from "express-fileupload";
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(upload());

app.set("view engine", "ejs"); //setiing app engine as ejs

var uploaded = {
	isUploaded: false,
	err: "",
};

app.get("/", (req, res) => {
	res.render("home");
});

app.get("/hospital", (req, res) => {
	res.render("hospital", { fileIsUploaded: uploaded });
});

app.post("/hospital", (req, res) => {
	if (req.files) {
		// console.log(req.files);
		var file = req.files.file;
		var fileName = file.name;
		// console.log(fileName);
		//Move the file to uploads directory
		file.mv("./uploads/" + fileName, (err) => {
			if (err) {
				uploaded.err = err;
			} else {
				uploaded.isUploaded = true;
			}
		});
		res.redirect("/hospital");
	}
});

app.listen(3000, () => {
	console.log("Server started at port 3000");
});
