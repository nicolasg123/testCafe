import * from bat::BDD
import * from bat::Assertions
---
suite("SchHourlyZjwXXIuxgODYceADCNRV") in [
  GET `http://www.google.com` with {
  "headers": {}
} assert [
    $.response.status mustEqual 200
  ]
]