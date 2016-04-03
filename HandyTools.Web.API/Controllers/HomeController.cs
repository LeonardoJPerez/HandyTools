﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HandyTools.Web.API.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return new RedirectResult("~/swagger/ui/index");
        }
    }
}
