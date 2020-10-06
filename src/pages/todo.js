import React, { Component, Fragment } from "react";
import ACTIONS from "../modules/action";
import { connect } from "react-redux";
import { withStyles, List, ListItem, ListItemSecondaryAction, ListItemText, IconButton, Grid, TextField, FormControl
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from '@material-ui/icons/AddCircle';

const styles = theme => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
        '& > span': {
        margin: theme.spacing(2),
        },
    },
    demo: {
        backgroundColor: theme.palette.background.paper
    },
    title: {
        margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`
    }
});

const mapStateToProps = state => ({
    items: state.items
});
  
const mapDispatchToProps = dispatch => ({
    createItem: item => dispatch(ACTIONS.createItem(item)),
    deleteItem: id => dispatch(ACTIONS.deleteItem(id))
});

class ToDO extends Component {
    state = {};

    generate = () => {
        return this.props.items.map(item => (
            <ListItem key={item.id}>
                <ListItemText primary={item.description} />
                <ListItemSecondaryAction>
                    <IconButton
                        aria-label="Delete"
                        onClick={this.handleDelete}
                        value={item.id}
                    >
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        ));
    };

    handleSubmit = event => {
        this.setState({ item: ""});
        if (this.state.item !== "") {
            this.props.createItem(this.state.item);
        }
        event.preventDefault();
    };

    handleDelete = event => {
        this.props.deleteItem(event.target.value);
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        const { classes } = this.props;
        console.log(classes);

        return (
            <div>
                <Fragment>
                    <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                        <FormControl>
                        <TextField
                            label="New Task"
                            id="margin-dense"
                            value={this.state.item}
                            className={classes.title}
                            margin="dense"
                            name="item"
                            onChange={this.handleChange}
                        />
                        <IconButton
                            aria-label="Add"
                            onClick={this.handleSubmit}
                            value={classes.id}
                        >
                            <AddCircleIcon />
                        </IconButton>
                        </FormControl>
                    </form>
                </Fragment>
                <Fragment>
                    <Grid item container justify="space-evenly" alignItems="center">
                        <div className={classes.demo}>
                            <List dense={false}>{this.generate()}</List>
                        </div>
                    </Grid>
                </Fragment>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(ToDO));