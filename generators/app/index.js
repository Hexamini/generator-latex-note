'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var yaml = require('js-yaml');

module.exports = yeoman.Base.extend({
  /**
   * Store for the variables value readed in the Yaml file. The idea is
   * keep all configurations in the Yaml file so it's easier to organize
   * them than passing them via options in the command line.
   */
  configuration: undefined,

  initializing: function () {
      // Read the Yaml file to set the LaTeX variables
      this.configuration = yaml.safeLoad(
        this.read(this.destinationPath('notes.yml'), 'utf-8')
      );
  },

  writing: function () {
    // Create the resource directory where keeping the lessons LaTeX files
    this.directory(
      this.templatePath('res'),
      this.destinationPath('res')
    );
    // Copy the main file LaTeX
    this.fs.copy(
      this.templatePath('main.tex'),
      this.destinationPath('main.tex')
    );
    // Copy the make file to build the pdf file
    this.fs.copy(
      this.templatePath('Makefile'),
      this.destinationPath('Makefile')
    );
    // Copy the list of LaTeX packages
    this.fs.copy(
      this.templatePath('config/package.tex'),
      this.destinationPath('config/package.tex')
    );

    this.fs.copyTpl(
      this.templatePath('config/config.tex'),
      this.destinationPath('config/config.tex'),
      this.configuration
    );
  }
});
