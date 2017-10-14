import React,{Component} from 'react';
import { Select, Checkbox, Dropdown } from 'semantic-ui-react';
import InputRange from 'react-input-range';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';

export const input ={
    renderSelect: (field) => {
        const error = !!(field.meta.touched && field.meta.error);
        return(
            <div>
                <Dropdown search error={error} className={field.className} { ...field.input } selection onChange={(param,data) => field.input.onChange(data.value)} placeholder={field.placeholder} value={field.input.value} options={field.options}/>
                <div style={{color:'red'}} className="text-help">
                    { field.meta.touched ? field.meta.error : '' }
                </div>
            </div>
        )
    },

    renderSelectSubmit: (field) => {
        const error = !!(field.meta.touched && field.meta.error);
        return(
            <div>
                <Select error={error} { ...field.input }
                        selection
                        onChange={(param,data) => {field.input.onChange(data.value);
                        setTimeout(()=>{
                            field.onChangeAction(data.value)
                        },200)
                        }}
                        placeholder={field.placeholder}
                        value={field.input.value}
                        options={field.options}/>
                <div style={{color:'red'}} className="text-help">
                    { field.meta.touched ? field.meta.error : '' }
                </div>
            </div>
        )
    },
    renderSlider: (field) => {
        return(
            <div>
                <label>{ field.label }</label>
                <InputRange
                    maxValue={field.max}
                    minValue={field.min}
                    { ...field.input }
                />
                <div style={{color:'red'}} className="text-help">
                    { field.meta.touched ? field.meta.error : '' }
                </div>
            </div>
        );
    },
    renderField:(field) => {
        const className = `form-group ${ field.meta.touched && field.meta.error ? 'has-danger' : ''}`;

        return(
            <div className={className}>

                <TextField
                    floatingLabelStyle={{color:'black'}}
                    type={field.type}
                    { ...field.input }
                    hintText={ field.label }
                    floatingLabelText={ field.label }
                    fullWidth={true}
                    errorText={field.meta.touched ? field.meta.error : ''}

                />

            </div>
        );
    },
    renderTextField: (field) => {
        const className = `form-group ${ field.meta.touched && field.meta.error ? 'has-danger' : ''}`;

        return(
            <div className={className}>
                <label>{ field.label }</label>
                <textarea
                    floatingLabelStyle={{color:'black'}}
                    className="form-control"
                    { ...field.input }
                ></textarea>
                <div className="text-help">
                    { field.meta.touched ? field.meta.error : '' }
                </div>
            </div>
        );
    },
    renderDatepicker: (field) => {
        return(
            <div>
                <DatePicker
                    floatingLabelStyle={{color:'black'}}
                    onChange={(event, date) => field.input.onChange(date)}
                    name={field.input.name}
                    value={field.input.value}
                    hintText={field.label}
                    autoOk={true}
                    openToYearSelection={true} />
                <div style={{color:'red'}} className="text-help">
                    { field.meta.touched ? field.meta.error : '' }
                </div>
            </div>
        )
    },
    renderSwitchCheckbox: (field) => {
        return(
            <div>
                <Checkbox slider
                          {...field.input}
                          value={field.input.value ? 'on' : 'off'}
                          onChange={(e, { checked }) => field.input.onChange(checked)}
                          label={field.label}
                          checked={(field.input.value == 'on' || field.input.value)? true : false}
                    />
                <div style={{color:'red'}} className="text-help">
                    { field.meta.touched ? field.meta.error : '' }
                </div>
            </div>
        )
    }

};