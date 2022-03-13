# Diagrams

___

- Diagrams
  - [1. changing options on the fly through socket](#1-changing-options-on-the-fly-through-socket)
  - [2. performance lookup](#2-performance-lookup)

___

### 1. changing options on the fly through socket

```mermaid
sequenceDiagram
    autonumber
    Note left of koorie: -sk='options(active:true:path:/tmp/koorie.sock)'
    Note left of koorie: Default hot is false
    curl->>koorie: http://localhost:3001
    Note left of koorie: koorie log -> hot:false
    koorie->>curl: response
    Note right of koorie-shell: set --hot=true --socket-path=/tmp/koorie.sock
    
    koorie-shell->>koorie: {"hot":"true"}
    koorie->>koorie-shell: receiving
    Note right of koorie: data well formed received
    loop 
        koorie->>koorie: applying process.env.HOT=true
    end
    Note right of koorie: single instance no reload. if cluster the workers are reloaded.
    koorie->>koorie-shell: closed
    Note right of koorie-shell: message and exit
    
    curl->>koorie: http://localhost:3001
    Note left of koorie: koorie log -> hot:true ?
    koorie->>curl: response
```

___

### 2. performance lookup

```mermaid
sequenceDiagram
    autonumber
    Note left of koorie: -sk='options(active:true:path:/tmp/koorie.sock)'
    Note right of koorie-shell: performance --refresh-rate=2000 --socket-path=/tmp/koorie.sock
    
    koorie-shell->>koorie: {"performance":"true", "refresh_rate":"2000"}
    koorie->>koorie-shell: receiving
    Note right of koorie: data well formed received
    loop Every 2000ms
        koorie-->koorie-shell: process.memoryUsage Object
    end
    Note right of koorie-shell: CTRL-C 
    koorie->>koorie-shell: closed
    Note right of koorie-shell: exit
```

___
