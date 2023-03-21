var passport = require('passport');
var app = require('express')();
var session = require('express-session');
var passportCustom = require('passport-custom');
const CustomStrategy = passportCustom.Strategy;
const axios = require('axios').default;
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var https = require('https')

const instance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
/*app.use(session({
  secret: 'keyboard cat',
  cookie: { secure: true, maxAge: 60000 },
  resave: true,
  saveUninitialized: true
}));*/
app.use(session(
  {
    secret: "chrisco",
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 24 * 1000,
      expires: 60 * 60 * 24 * 1000,
    }
  }));


//app.use(passport);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
  console.log("session seriaize #######")
  console.log(user)
  process.nextTick(function () {

    return cb(null, {
      email: user?.email,
      roles: user?.roles,
      name: user?.name,
      lastname: user?.lastname,
      firstname: user?.firstname,
      username: user?.username,
      names: user?.names,
      phoneNumber: user?.phoneNumber,
      jwt: user?.jwt,
      names: user?.names,
    });
  });
});

passport.deserializeUser(function (user, cb) {
  console.log("session deserelize ######")
  console.log(user)
  process.nextTick(function () {
    return cb(null, user);
  });
});


let getToken = async (code, req, callback) => {
  console.log("Token ###########")
  //console.log(process.env.BAADHI_TEAMS_BASE_URL)

  //console.log(req.user)
  if (req.user) {
    callback(null, { ...req.user })
    return;
  }
  const requestData = {
    code: code
  };
  try {
    console.log("session")
    //console.log(user)
    let { data } = await instance.post(
      `${process.env.BAADHI_TEAMS_BASE_URL}/api/login`,
      requestData,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
    callback(null, data)

  } catch (error) {
    //console.log("ko ko ko")
    console.log(error)
    callback(error, null)
    //callback(new Error("code"), null)
  }

}

passport.use('code', new CustomStrategy(
  function (req, callback) {
    // Do your custom user finding logic here, or set to false based on req object
    console.log(req.user)
    let code = req.query?.code
    getToken(code, req, callback)
  }
));


app.get(
  '/login',
  passport.authenticate('code', { failureRedirect: '/login' }),
  (req, res) => {
    if (req.user) {
      res.status(200);
      res.json({
        message: "ok",
        user: req.user
      })
    } else {
      res.status(401);
      res.json({
        message: "ok",
        user: req.user
      })
    }
  }
)

app.use(
  /*passport.authenticate('code', { failureRedirect: '/login' }),*/
  async (req, res, next) => {
    let method = req.method
    let originalUrl = req.originalUrl
    let user = req.user
    console.log("####################")
    console.log(originalUrl)

    /*if (!user) {
    console.log("user")
    next(Error("Unauthorize"))
      return;
    }*/

    //let headers = req.headers
    let headers = {}
    //headers["Authorization"] = "Bearer " + user.jwt
    headers["Content-Type"] = "application/json"
    headers["Accept"] = "application/json"
    if (method.toUpperCase() == "PATCH") {
      headers["Content-Type"] = "application/merge-patch+json"
    } else {
      headers["Content-Type"] = "application/json"
    }

    let resAxios = null
    let url = `${process.env.BAADHI_TEAMS_BASE_URL}` + originalUrl
    try {
      if (
        !!["POST", "PUT", "PATCH"].find(methodIt => method.toUpperCase() == methodIt)
      ) {
        resAxios = await instance.request(
          {
            method,
            data: req.body,
            headers,
            url
          }
        )
      } else {
        resAxios = await instance.request(
          {
            method,
            //data:req.body,
            headers,
            url
          }
        )

      }

      let data = resAxios.data
      //AxiosResponse
      res.status(resAxios.status)
      res.json(data)

    } catch (error) {
      console.log("#####################oooo###############")
      console.log(error)
      next(error)
      return;

    }
  }
)

app.use((err, req, res, next) => {
  console.log("Middleware Error Hadnling");
  let status = 500
  console.log(!!err.response &&
    !!err.response.status && 401 == err.response.status)
  if (
    !!err.response &&
    !!err.response.status &&
    err.response.status >= 500
  ) {

    res.status(err.response.status)

    res.json({
      "message": "Server error"
    })

  }
  else if (
    !!err.response &&
    !!err.response.status &&
    401 == err.response.status
  ) {

    //console.log(err.response);
    res.status(err.response.status)

    res.json({
      "message": "Client error",
      "messageDetail": err.response.data["hydra:description"],
      "messageBrut": err.response.data,
    })

  }
  else if (
    !!err.response &&
    !!err.response.status &&
    err.response.status >= 400
  ) {

    res.status(err.response.status)

    res.json({
      "message": "Client error",
      "messageDetail": err.response.data["hydra:description"],
      "messageBrut": err.response.data,
    })

  } else {
    res.status(500)

    res.json({
      "message": "Server error"
    })
  }
}
)


module.exports = app
