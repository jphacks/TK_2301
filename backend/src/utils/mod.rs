pub fn get_user_info_from_query(query: &str) -> Result<(String, String), actix_web::Error> {
    let res = query
        .split("&")
        .map(|x| {
            let x = x.split("=").collect::<Vec<&str>>();
            x.get(1).unwrap_or(&"0").to_string()
        })
        .collect::<Vec<String>>();

    if res.len() != 2 {
        return Err(actix_web::error::ErrorBadRequest("bad query"));
    }

    let (recv_user_id, user_name) = (
        res.get(0).unwrap().to_owned(),
        res.get(1).unwrap().to_owned(),
    );

    Ok((recv_user_id, user_name))
}
