
Todo: 
1. Bumbarding - done - dint miss any notification on testing API with -c 100 -n 50000 
2. offline use case - if not active it will miss - althought the option of having separate logs/queue table for ref
3. action for each notification CURD ---> https://www.postgresql.org/docs/current/plpgsql-trigger.html#PLPGSQL-DML-TRIGGER

ab  -k -l -v 3  -T application/json -H "Authorization: Bearer $TOKEN"  -p post.json  -c 100 -n 5000 http://localhost:3000/todos

    Concurrency Level:      100
    Time taken for tests:   11.256 seconds
    Complete requests:      5000
    Failed requests:        0

ab  -k -l -v 3  -T application/json -H "Authorization: Bearer $TOKEN"  -p post.json  -c 100 -n 10000 http://localhost:3000/todos

    Concurrency Level:      100
    Time taken for tests:   22.211 seconds
    Complete requests:      10000
    Failed requests:        0

ab  -k -l -v 3  -T application/json -H "Authorization: Bearer $TOKEN"  -p post.json  -c 100 -n 15000 http://localhost:3000/todos

    Concurrency Level:      100
    Time taken for tests:   35.347 seconds
    Complete requests:      15000
    Failed requests:        0

ab  -k -l -v 3  -T application/json -H "Authorization: Bearer $TOKEN"  -p post.json  -c 100 -n 50000 http://localhost:3000/todos

    Concurrency Level:      100
    Time taken for tests:   115.573 seconds
    Complete requests:      50000
    Failed requests:        0

    Notify from diff app with same channel name
    https://github.com/kamblepratik90/postgrest-poc/tree/main/Tutorial_7_notify/docker/init-db

    and listen to same channel from this app