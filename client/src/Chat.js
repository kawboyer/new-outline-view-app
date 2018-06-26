import React from "react";
import io from "socket.io-client";

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      node: "",
      nodes: []
    };

    this.socket = io("localhost:8080");

    this.socket.on("RECEIVE_node", function(data) {
      addnode(data);
    });

    const addnode = data => {
      console.log(data);
      this.setState({ nodes: [...this.state.nodes, data] });
      console.log(this.state.nodes);
    };

    this.sendnode = ev => {
      ev.preventDefault();
      this.socket.emit("SEND_node", {
        author: this.state.username,
        node: this.state.node
      });
      this.setState({ node: "" });
    };
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-4">
            <div className="card">
              <div className="input-group center">
                <input type="text" placeholder="Node" className="form-control" value={this.state.node} onChange={ev => this.setState({ node: ev.target.value })}/>
                <br />
                <span class="input-group-btn">
                  <button onClick={this.sendNode} className="btn btn-primary form-control">Send</button>
                </span>
              </div>

                            <div className="card-body">
                <div className="card-title">Add a new node</div>
                <hr />
                <div className="nodes">
                  {this.state.nodes.map(node => {
                    return (
                      <div>
                        {node.author}: {node.node}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
