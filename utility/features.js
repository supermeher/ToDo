import jwt from "jsonwebtoken";

export const sendCookie = (user,res,message,success=200) => {
  const token = jwt.sign({ _id: user._id }, process.env.SECRET);
  console.log(process.end.NODE_URI);
  console.log(process.end.NODE_URI==='Development');
  res
    .status(201)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 30,
      sameSite:process.env.NODE_URI ==='Development'? "lax":"none",
      secure:process.env.NODE_URI ==='Development'? false:true,
    })
    .json({
      success,
      message
    });
};
