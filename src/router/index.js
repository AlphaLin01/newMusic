import React,{ Component } from 'react'
import { Redirect,Route,Switch } from 'react-router-dom'

export default (props)=>{
    // console.log(routes);
       return (
              <Switch>
              {
                  props.routes.map((i,ind)=>{
                    if(i.path==='*'){
                        return <Redirect key={ind} to={i.redirect}/>
                    }else if(i.exact){
                        return <Route key={ind} path={i.path} exact component={i.component} />
                    }
                    else{
                        return <Route key={ind} path={i.path} component={i.component} />
                    }
                  })
              }
              </Switch>
       )
    }


