<style>
  .select {
    color: var(--black);
    position: relative;
  }
  .display {
    display: flex;
    align-items: center;
    padding: 7px;
    border: 1px solid var(--black);
    background-color: var(--white);
  }
  .selected {
    width: 100%;
    overflow: auto;
    display: flex;
    align-items: center;
    flex-grow: 1;
    gap: 5px;
    cursor: pointer;
    white-space: nowrap;
  }
  .placeholder {
    color: var(--muted);
    font-style: italic;
  }
  .count {
    display: inline-block;
    padding-left: 4px;
    color: var(--muted);
    font-size: 12px;
  }
  .clear, .toggle, .add {
    cursor: pointer;
  }
  .dropdown {
    background-color: var(--white);
    border: 1px solid var(--black);
    overflow: auto;
    position: absolute;
    width: 100%;
    max-height: 200px;
  }
  .form {
    display: flex;
    align-items: center;
    margin: 5px;
    padding: 7px;
    border: 1px solid var(--muted);
    height: 18px;
  }
  .input {
    flex-grow: 1;
    padding: 0;
    border: 0;
    background-color: transparent;
  }
  .input:focus {
    outline: none;
  }
  .search {
    color: var(--muted);
  }
  .options {
    overflow: auto;
    cursor: pointer;
  }
  .option {
    align-items: center;
    display: flex;
    padding: 7px;
  }
  .option img {
    height: 16px;
    margin-right: 5px;
  }
  .option:hover {
    background-color: var(--muted);
  }
  .selected .option {
    padding: 0;
  }
  .selected .option:hover {
    background-color: transparent;
  }
</style>
<script observe="name,value">
  import intl from '../utilities/intl.json';
  import { getHandlers } from '../utilities/select';
  //extract props
  const { name, placeholder = 'Select Country' } = this.props;
  const options = intl.map(country => {
    const flag = this.createElement('img', { 
      loading: 'lazy', 
      src: `https://flagcdn.com/w80/${country.countryCode.toLowerCase()}.png` 
    });
    const label = this.createElement('span', {}, [ 
      new Text(country.countryName) 
    ]); 
    return this.createElement('div', { 
      'class': 'option',
      keyword: `${country.countryCode} ${country.countryName}`, 
      value: country.countryCode
    }, [ flag, label ]).element;
  });
  //get handlers
  const { state, clear, toggle, filter, add } = getHandlers(this, options, false);
</script>
<template type="light">
  <if true={name}>
    <each value=value from={state.value.values}>
      <input type="hidden" {name} value={value.toString()} />
    </each>
  </if>
</template>
<template type="shadow">
  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" />
  <div class="select">
    <div class="display">
      <div class="selected" click={toggle}>
        <if true={state.value.selected.length > 0}>
          {state.value.selected}
        <elif true={placeholder} />
          <span class="placeholder">
            {placeholder}
          </span>
        </if>
      </div>
      <if true={state.value.selected.length > 1}>
        <em class="count">({state.value.selected.length})</em>
      </if>
      <if true={state.value.selected.length > 0}>
        <i class="clear fas fa-fw fa-times" click={clear}></i>
      </if>
      <if true={state.value.filtered.length > 0 || state.value.query.length > 0}>
        <if true={state.value.show}>
          <i class="toggle fas fa-fw fa-caret-up" click={toggle}></i>
        <else />
          <i class="toggle fas fa-fw fa-caret-down" click={toggle}></i>
        </if>
      </if>
    </div>
    <if true={state.value.show && (state.value.filtered.length > 0 || state.value.query.length > 0)}>
      <div class="dropdown">
        <div class="form">
          <input class="input" value={state.value.query} keyup={filter} />
          <i class="search fas fa-fe fa-search"></i>
        </div>
        <div class="options">{state.value.filtered}</div>
      </div>
    </if>
  </div>
</template>
