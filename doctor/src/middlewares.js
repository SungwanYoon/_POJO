const betweenHome = (req, res, next) => {
  console.log("between");
  next();
};
app.use(betweenHome);
app.get("/", handleHome);
app.get("/profile", handleProfile);
