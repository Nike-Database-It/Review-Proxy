import http from "k6/http";
import { sleep } from "k6";

export let options = {
	vus: 200,
	duration: "5s",
};

export default function() {
    http.get("http://localhost:3000/9888765/reviews");
    sleep(1);
};     
  